import React from 'react'


const Members = props => {
    // console.log(props)

    return (
        <section className="section--members">

            {props.members.map(member => (
                <section className="section--member-card" key={member.id}>
                    <div className="section__block--member-card-title">
                        <div className="block--member-card-left">
                            <h3>{member.name}</h3>
                            <p>{member.email}</p>
                            <p>{member.role}</p>

                        </div>
                        <div className="block--member-card-right">
                            <i className="i--delete" onClick={() => props.removeMember(member.id)}>delete</i>
                            <i className="i--edit" onClick={() => props.editMember(member.id)}>edit</i>
                        </div>
                    </div>
                </section>
            ))}

        </section>
    );
}


export default Members

