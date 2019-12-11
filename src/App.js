import React, { useState } from 'react';
import logo from './logo.svg';

import Members from "./Members";
import Form from "./Form";


function App() {
  const [ members, setMembers ] = useState([
    {
      id: 1,
      name: "admin",
      email: "testing@your.patience",
      role: "admin"
    }
  ]);
  const [ editMemberArray, setEditMemberArray ] = useState(null)

  const removeMember = (memberId) => {
    let membersAfterMemberRemoved = members.filter(member => member.id !== memberId);
    setMembers(membersAfterMemberRemoved);
  }

  const editMember = (memberId) => {
    setEditMemberArray(null);
    let memberArrayToEdit = members.filter(member => member.id === memberId);
    let memberObjectToEdit = memberArrayToEdit[0];
    let remainingMembers = members.filter(member => member.id !== memberId);
    
    setEditMemberArray([ memberObjectToEdit, remainingMembers ]);
  }

  return (
    <section className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <code>Members Managment Application</code>
        <h5>Features</h5>
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
