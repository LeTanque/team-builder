import React, { useState, useEffect } from 'react';


const Form = props => {
    const { members, setMembers, editMemberArray, setEditMemberArray } = props;

    const [ formState, setFormState ] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    });
    const [ userMessage, setUserMessage ] = useState(null);

    
    useEffect(() => {
        if (editMemberArray) {
            console.log("editMemberArray has been received!", editMemberArray);
            setFormState(editMemberArray[0]);
        };
    }, [editMemberArray]);


    const addMember = (event) => {
        event.preventDefault(); 
        
        if (!formState.name) {
            setUserMessage("Please provide a name");
            return null
        } else if (editMemberArray) {
            setMembers([ ...editMemberArray[1], formState ]);
            setEditMemberArray(null);
            setUserMessage(null);
            return setFormState({ id: "", name: "", email: "", role: "" });
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
                    onChange={(event) => setFormState({ ...formState, [event.target.name]: event.target.value })}
                />
                
                {userMessage ? (
                    <>
                        <br/>
                        <p className="error">{userMessage}</p>
                    </>
                ) : null}
                
                <br/>
                
                {editMemberArray ? (
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

