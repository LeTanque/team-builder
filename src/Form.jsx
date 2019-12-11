import React, { useState, useEffect } from 'react';


const Form = props => {
    const { members, setMembers, editMemberArray, setEditMemberArray } = props; // Destructuring props

    const [ formState, setFormState ] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    });
    
    // This only becomes populated with data IF the user submits the form WITHOUT including a name
    // If and when this is populated, it will trigger the message
    const [ userMessage, setUserMessage ] = useState(null); 

    
    useEffect(() => {
        // If there is an incoming edit, populate the form state with the member info to be edited
        if (editMemberArray) { 
            // console.log("editMemberArray has been received!", editMemberArray);

            // Remember, the first item in the editMemberArray is an object
            setFormState(editMemberArray[0]); 
        };
    }, [editMemberArray]);


    // Method adds AND edits members, because those two functions are very similar
    // It is common to see this as two different methods; not all devs will combine the two
    // It is also common to see completely different forms for edit and add
    const addMember = (event) => { 
        event.preventDefault(); 
        
        if (!formState.name) { // Form validation. If name exists, proceed. Otherwise, stop here.
            setUserMessage("Please provide a name");
            return null
        } else if (editMemberArray) {
            setMembers([ ...editMemberArray[1], formState ]); // Update member array with new object + other members
            setEditMemberArray(null); // Clear edit member array
            setUserMessage(null); // Clear message
            return setFormState({ id: "", name: "", email: "", role: "" }); // Clear form
        } else {
            setMembers([ ...members, { ...formState, id: Math.ceil(Math.random() * 100) } ]);
            setUserMessage(null);
            return setFormState({ id: "", name: "", email: "", role: "" });
        }  
    };



    return (
        <section className="section__form">
            <form  onSubmit={addMember}>
                <input 
                    name='name'
                    type='text'
                    placeholder='Name...'
                    value={formState.name}
                    // This is the change handler inline in a synthetic event
                    // Optional. You can always put this in a method of it's own if it's easier for you
                    // inline or as a separate method doesn't impact performance
                    onChange={(event) => setFormState({ ...formState, [event.target.name]: event.target.value })} 
                />
                <input 
                    name='email'
                    type='email'
                    placeholder='email@domain.tld...'
                    value={formState.email}
                    onChange={(event) => setFormState({ ...formState, [event.target.name]: event.target.value })}
                />
                <input 
                    name='role'
                    type='text'
                    placeholder='Role'
                    value={formState.role}
                    onChange={(event) => setFormState({ ...formState, role: event.target.value })}
                />
                
                {userMessage ? ( // This is conditionally rendered if the userMessage hook becomes populated with data
                    <>
                        <br/>
                        <p className="error">{userMessage}</p>
                    </>
                ) : null}
                
                <br/>
                
                {editMemberArray ? ( // Conditionally render the button to say edit or add respective of user input
                    <button className="button--edit">
                        Edit Member
                    </button>
                ) : (
                    <button className="button--add">
                        Add Member
                    </button>
                )}

            </form>
        </section>
    );
}


export default Form

