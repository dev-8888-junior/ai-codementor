const formatResponse = (
  title,
  explanation,
  code,
  output
) => {
  return `
# ${title}

${explanation}

## Example

\`\`\`javascript
${code}
\`\`\`

## Output

\`\`\`
${output}
\`\`\`
`;
};

export const chatWithAI = async (
  req,
  res
) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    let reply = "";

    // ARRAYS
    if (
      message
        .toLowerCase()
        .includes("array")
    ) {
      reply = formatResponse(
        "JavaScript Arrays",

        "Arrays store multiple values in one variable.",

        `const fruits = ["apple", "banana", "mango"];

console.log(fruits[0]);`,

        `apple`
      );
    }

    // CLOSURES
    else if (
      message
        .toLowerCase()
        .includes("closure")
    ) {
      reply = formatResponse(
        "JavaScript Closures",

        "A closure happens when a function remembers variables from its outer scope even after the outer function has finished running.",

        `function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();

counter();
counter();`,

        `1
2`
      );
    }

    // REACT
    else if (
      message
        .toLowerCase()
        .includes("react")
    ) {
      reply = formatResponse(
        "React Basics",

        "React is a JavaScript library used to build user interfaces using reusable components.",

        `function App() {
  return <h1>Hello World</h1>;
}`,

        `Hello World`
      );
    }

    // PROMISES
    else if (
      message
        .toLowerCase()
        .includes("promise")
    ) {
      reply = formatResponse(
        "JavaScript Promises",

        "Promises handle asynchronous operations in JavaScript.",

        `const promise = new Promise((resolve, reject) => {
  resolve("Success");
});

promise.then((data) => {
  console.log(data);
});`,

        `Success`
      );
    }

    // DEFAULT
    else {
      reply = `
# I'm CodeMentor AI 👋

I help beginner developers learn programming concepts in simple language.

## I Specialize In

- JavaScript
- React
- Closures
- Arrays
- Promises
- Beginner Coding Concepts

## Try Asking

- Explain arrays
- Explain closures
- What is React?
- Explain promises
      `;
    }

    // Fake AI delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
};