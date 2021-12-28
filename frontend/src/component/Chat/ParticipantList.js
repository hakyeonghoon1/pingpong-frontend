import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const ParticipantList = ({participant}) => {
    return (
        <DropdownButton id="dropdown-item-button" title="참가자">
            {
                participant
                            .map((participants)=>{
                                return (
                                    <Dropdown.Item as="button">{participants.name}</Dropdown.Item>
                                )
                            })
            }
        </DropdownButton>
    );
};

export default ParticipantList;