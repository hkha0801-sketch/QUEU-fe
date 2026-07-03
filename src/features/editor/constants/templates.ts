const cppSource = `#include <iostream>

int main() {
    std::cout << "hello, world" << std::endl;
    return 0;
}
`;

const cSource = `#include <stdio.h>

int main() {
    printf("hello, world\\n");
    return 0;
}
`;

const pascalSource = `program Hello;
begin
    writeln ('hello, world')
end.
`;

const pythonSource = `print("hello, world")`;

const javaSource = `public class Main {
    public static void main(String[] args) {
        System.out.println("hello, world");
    }
}
`;

const javaScriptSource = `console.log("hello, world");`;

const cppTestSource = `#include <gtest/gtest.h>

int add(int x, int y) {
    return x + y;
}

TEST(AdditionTest, NeutralElement) {
    EXPECT_EQ(1, add(1, 0));
    EXPECT_EQ(1, add(0, 1));
    EXPECT_EQ(0, add(0, 0));
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
`;

export const SOURCE_TEMPLATES: Record<number, string> = {
  48: cSource,
  49: cSource,
  50: cSource,
  52: cppSource,
  53: cppSource,
  54: cppSource,
  62: javaSource,
  63: javaScriptSource,
  67: pascalSource,
  70: pythonSource,
  71: pythonSource,
  75: cSource,
  76: cppSource,
  1001: cSource,
  1002: cppSource,
  1012: cppTestSource,
  1013: cSource,
  1014: cppSource,
  1015: cppTestSource,
};

export function getTemplateForLanguage(languageId: number): string {
  return SOURCE_TEMPLATES[languageId] ?? pythonSource;
}
