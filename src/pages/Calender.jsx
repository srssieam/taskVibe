import { Container } from '@mui/material';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
const Calender = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <Container>
                <Calendar onChange={onChange} value={value} />
            </Container>
        </div>
    );
};

export default Calender;