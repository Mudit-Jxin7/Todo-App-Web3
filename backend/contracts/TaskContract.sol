// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
  event AddTasks(address recipient , uint taskId);
  event DeleteTasks(uint taskId , bool isDeleted);

  struct Task {
    uint id;
    string taskText;
    bool isDeleted;
  }

  Task[] private tasks;
  mapping(uint256 => address) TaskToOwner;

  function AddTask(string memory taskText , bool isDeleted) external {
    uint taskId = tasks.length;
    tasks.push(Task(taskId , taskText , isDeleted));
    TaskToOwner[taskId] = msg.sender;
    emit AddTasks(msg.sender, taskId);
  }

  function getMyTasks() external view returns (Task[] memory) {
    Task[] memory temporary = new Task[](tasks.length);
    uint counter = 0;

    for(uint i = 0; i < tasks.length; i++){
      if(TaskToOwner[i] == msg.sender && tasks[i].isDeleted == false){
        temporary[counter] = tasks[i];
        counter++;
      }
    }

    Task[] memory result = new Task[](counter);
    for(uint i = 0; i < counter; i++){
      result[i] = temporary[i];
    }

    return result;
  }

  function DeleteTask(uint taskId , bool isDeleted) external{
    if(TaskToOwner[taskId] == msg.sender){
      tasks[taskId].isDeleted = isDeleted;
      emit DeleteTasks(taskId, isDeleted);
    }
  }

}
