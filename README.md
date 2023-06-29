# Todo App - Readme

A Todo application built using Next.js, Solidity, and Truffle. The application allows users to create and delete tasks on a blockchain network.

## Features

- Create tasks: Users can add new tasks to the application. Each task is stored on the blockchain network, ensuring transparency and immutability.
- Delete tasks: Users can remove tasks from the application. The task deletion is reflected on the blockchain, maintaining the integrity of the data.

## Technologies Used

- Next.js: A React framework for server-side rendering and building web applications.
- Solidity: A programming language used for writing smart contracts on the Ethereum blockchain.
- Truffle: A development framework for Ethereum that simplifies the process of building, testing, and deploying smart contracts.

## Prerequisites

Make sure you have the following dependencies installed on your machine:

- Node.js: The JavaScript runtime environment used to run Next.js.
- Truffle: Install Truffle globally using the command: `npm install -g truffle`
- Ganache: A personal blockchain for Ethereum development. Install Ganache from [https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache).

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Mudit-Jxin7/Todo-App-Web3.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Todo-App-Web3
   ```

3. Install the dependencies(also inside the client):

   ```bash
   npm install
   ```

4. Compile the Solidity contracts:

   ```bash
   cd backend
   truffle compile
   ```

5. Migrate the contracts to the local blockchain:

   ```bash
   truffle migrate
   ```

   Ensure that Ganache is running on your machine before executing this command.

6. Start the Next.js development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

1. Open the application in your web browser.

2. To create a new task, enter the task details in the input field and click the "Add" button. The task will be added to the list.

3. To delete a task, click the "Delete" button next to the task you want to remove. The task will be deleted from the list.

## Contribution

Contributions to the Todo app are welcome. If you encounter any issues or have suggestions for improvements, please create a pull request or open an issue on the project's GitHub repository.

## Acknowledgments

This Todo app was developed using the guidance and resources provided by the Next.js, Solidity, and Truffle communities. Special thanks to the contributors of these projects for their excellent work.
