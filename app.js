const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-button');
const solutionDisplay = document.querySelector('#solution');

// total number of squares
const squares = 81;

// Array that needs to be submitted
let submission = [];

for (let i = 0; i < squares; i++) {
  // Creating input element
  const inputElement = document.createElement('input');

  // Setting the data type of inputElement to Number only.
  inputElement.setAttribute('type', 'number');

  // Setting minimum value of inputElement to 0
  inputElement.setAttribute('min', '1');

  // Setting maximum value of inputElement to 9
  inputElement.setAttribute('max', '9');

  // Adding colors
  if (
    ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i < 21) ||
    ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i < 27) ||
    ((i % 9 === 3 || i % 9 === 4 || i % 9 === 5) && i > 27 && i < 53) ||
    ((i % 9 === 0 || i % 9 === 1 || i % 9 === 2) && i > 53) ||
    ((i % 9 === 6 || i % 9 === 7 || i % 9 === 8) && i > 53)
  ) {
    inputElement.classList.add('odd-section');
  }

  //   Appending input elements to puzzleBoard
  puzzleBoard.appendChild(inputElement);
}

// Get all the values from the input and store in an array to be solved
const joinValues = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push('x');
    }
  });
  //   console.log(submission);
};

const populateValues = (canBeSolved, answer) => {
  const inputs = document.querySelectorAll('input');

  if (canBeSolved && answer) {
    inputs.forEach((input, i) => {
      input.value = answer[i];
    });
    solutionDisplay.innerHTML = 'This is the answer';
  } else {
    solutionDisplay.innerHTML = 'This is not solvable';
  }
};

const solve = async () => {
  //   try {
  //     joinValues();
  //     const res = submission.join('');
  //     console.log(res);

  //     const data = {
  //       input: res,
  //     };
  //     const config = {
  //       headers: {
  //         'content-type': 'application/json',
  //         'x-rapidapi-host': 'sudoku-solver2.p.rapidapi.com',
  //         'x-rapidapi-key': '0bfef72affmsh849ed47e360d837p17cc8fjsn7169275a7c42',
  //       },
  //     };
  //     const response = await axios.post(
  //       'https://sudoku-solver2.p.rapidapi.com/',
  //       data,
  //       config
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  joinValues();

  const data = { numbers: submission.join('') };

  //   console.log(data);

  fetch('http://localhost:8000/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      populateValues(data.canBeSolved, data.answer);

      submission = [];
    })
    .catch((error) => {
      console.log(error);
    });
};

solveButton.addEventListener('click', solve);
