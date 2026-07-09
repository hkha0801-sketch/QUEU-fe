export interface LanguageOption {
  id: number;
  label: string;
  mode: string;
  fileName: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 54, label: "C++ (GCC 9.2.0)", mode: "cpp", fileName: "main.cpp" },
  { id: 76, label: "C++ (Clang 7.0.1)", mode: "cpp", fileName: "main.cpp" },
  { id: 1014, label: "C++ (Clang 9.0.1)", mode: "cpp", fileName: "main.cpp" },
  { id: 1002, label: "C++ (Clang 10.0.1)", mode: "cpp", fileName: "main.cpp" },
  { id: 52, label: "C++ (GCC 7.4.0)", mode: "cpp", fileName: "main.cpp" },
  { id: 53, label: "C++ (GCC 8.3.0)", mode: "cpp", fileName: "main.cpp" },
  { id: 1015, label: "C++ Test (Clang 10.0.1, Google Test 1.8.1)", mode: "cpp", fileName: "main.cpp" },
  { id: 1012, label: "C++ Test (GCC 8.4.0, Google Test 1.8.1)", mode: "cpp", fileName: "main.cpp" },
  { id: 75, label: "C (Clang 7.0.1)", mode: "c", fileName: "main.c" },
  { id: 1013, label: "C (Clang 9.0.1)", mode: "c", fileName: "main.c" },
  { id: 1001, label: "C (Clang 10.0.1)", mode: "c", fileName: "main.c" },
  { id: 48, label: "C (GCC 7.4.0)", mode: "c", fileName: "main.c" },
  { id: 49, label: "C (GCC 8.3.0)", mode: "c", fileName: "main.c" },
  { id: 50, label: "C (GCC 9.2.0)", mode: "c", fileName: "main.c" },
  { id: 67, label: "Pascal (FPC 3.0.4)", mode: "pascal", fileName: "main.pas" },
  { id: 70, label: "Python (2.7.17)", mode: "python", fileName: "script.py" },
  { id: 71, label: "Python (3.8.1)", mode: "python", fileName: "script.py" },
  { id: 62, label: "Java (OpenJDK 13.0.6)", mode: "java", fileName: "Main.java" },
  { id: 63, label: "JavaScript (Node.js 12.14.0)", mode: "javascript", fileName: "script.js" },
];

const LANGUAGE_ID_TABLE: Record<number, number> = {
  1001: 1,
  1002: 2,
  1013: 13,
  1014: 14,
  1012: 12,
  1015: 15,
};

export function resolveLanguageId(id: number): number {
  return LANGUAGE_ID_TABLE[id] ?? id;
}

export function getLanguageById(id: number): LanguageOption | undefined {
  return LANGUAGE_OPTIONS.find((lang) => lang.id === id);
}

export const DEFAULT_LANGUAGE_ID = 71;
