import { resolveLanguageId } from "../constants/languages";

const DEFAULT_API_URL = "https://judge0-ce.p.rapidapi.com";
const INITIAL_WAIT_MS = 500;
const MAX_PROBE_REQUESTS = 50;
const waitStepMs = (iteration: number) => 100 * iteration;

export interface SubmissionResult {
  status: { id: number; description: string };
  stdout: string | null;
  compile_output: string | null;
  time: string | null;
  memory: number | null;
}

function encodeBase64(value: string): string {
  return btoa(unescape(encodeURIComponent(value || "")));
}

function decodeBase64(value: string | null): string {
  if (!value) return "";
  const escaped = escape(atob(value));
  try {
    return decodeURIComponent(escaped);
  } catch {
    return unescape(escaped);
  }
}

function getAuthHeaders(): HeadersInit {
  const apiKey = process.env.REACT_APP_JUDGE0_API_KEY;
  if (!apiKey) return {};
  return { "X-RapidAPI-Key": apiKey };
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = await response.text();
    return body || response.statusText;
  } catch {
    return response.statusText;
  }
}

async function fetchSubmission(
  apiUrl: string,
  token: string,
  iteration = 1
): Promise<SubmissionResult> {
  if (iteration >= MAX_PROBE_REQUESTS) {
    throw new Error("Maximum number of probe requests reached");
  }

  const response = await fetch(
    `${apiUrl}/submissions/${token}?base64_encoded=true`,
    {
      headers: {
        Accept: "application/json",
        ...getAuthHeaders(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = (await response.json()) as SubmissionResult;

  if (data.status.id <= 2) {
    await new Promise((resolve) => setTimeout(resolve, waitStepMs(iteration)));
    return fetchSubmission(apiUrl, token, iteration + 1);
  }

  return data;
}

export interface RunCodePayload {
  sourceCode: string;
  stdin: string;
  languageId: number;
  compilerOptions?: string;
  commandLineArguments?: string;
}

export async function runCode(payload: RunCodePayload): Promise<{
  output: string;
  statusLine: string;
}> {
  const apiUrl = process.env.REACT_APP_JUDGE0_API_URL || DEFAULT_API_URL;
  const resolvedLanguageId = resolveLanguageId(payload.languageId);

  const body = {
    source_code: encodeBase64(payload.sourceCode),
    language_id: resolvedLanguageId,
    stdin: encodeBase64(payload.stdin),
    compiler_options: payload.compilerOptions || "",
    command_line_arguments: payload.commandLineArguments || "",
    redirect_stderr_to_stdout: true,
  };

  const response = await fetch(`${apiUrl}/submissions?base64_encoded=true&wait=false`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const submission = (await response.json()) as { token: string };
  const result = await fetchSubmission(apiUrl, submission.token);

  const stdout = decodeBase64(result.stdout);
  const compileOutput = decodeBase64(result.compile_output);
  const output = [compileOutput, stdout].join("\n").trim();
  const time = result.time === null ? "-" : `${result.time}s`;
  const memory = result.memory === null ? "-" : `${result.memory}KB`;
  const statusLine = `${result.status.description}, ${time}, ${memory}`;

  return { output, statusLine };
}
