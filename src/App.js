import React, { useState } from 'react';
import logo from './logo.svg';

import Members from "./Members";
import Form from "./Form";


function App() {
  
  // this is the state object that holds all of the members
  const [ members, setMembers ] = useState([ 
    {
      id: 1,
      name: "admin",
      email: "testing@your.patience",
      role: "admin"
    }
  ]);
  

  // When we are editing the members, the member we are editing is stored here
  // When we are not editing a member, it's state is null
  // This allows us to conditionally render the add/edit button 
  // as well as conditionally execute the add/edit functions
  const [ editMemberArray, setEditMemberArray ] = useState(null); 


  // remove member method
  const removeMember = (memberId) => {
    let membersAfterMemberRemoved = members.filter(member => member.id !== memberId);
    setMembers(membersAfterMemberRemoved);
  };


  // edit member method
  // This method extracts the member that is being edited, and the remaining members, and then pushes that object and array into the 
  // editMemberArray. When editing, the editMemberArray will be an array that contains an object and an array
  // The object is the specific member being edited. 
  // The array is all of the other members
  const editMember = (memberId) => {
    // "setEditMemberArray(null)" ensures that the editMemberArray remains empty, 
    // even if the user clicks several edit buttons before editing
    setEditMemberArray(null); 
    let memberArrayToEdit = members.filter(member => member.id === memberId);
    let memberObjectToEdit = memberArrayToEdit[0];
    let remainingMembers = members.filter(member => member.id !== memberId);
    
    setEditMemberArray([ memberObjectToEdit, remainingMembers ]);
  };


  return (
    <section className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <code>Members Managment Application</code>
        <h5>Features</h5>
        <p>display members</p>
        <p>add member</p>
        <p>delete member</p>
        <p>edit member</p>
        <p>simple form validation</p>
      </header>

      <Form 
        members={members}
        setMembers={setMembers}
        editMemberArray={editMemberArray}
        setEditMemberArray={setEditMemberArray}
      />

      <Members 
        members={members}
        removeMember={removeMember}
        editMember={editMember}
      />

    </section>
  );
}

export default App;
