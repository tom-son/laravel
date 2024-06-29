import React from 'react';
import {FormControl, InputAdornment, InputLabel, TextField, TextFieldVariants} from "@mui/material";

interface CurrencyFieldProps {
    label: string;
    id: string;
    value: number | null;
    variant?: TextFieldVariants;
    onChange?: (value: number | null) => void;
    readonly?: boolean;
    width?: string;
}

function CurrencyField(props: CurrencyFieldProps)
{

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('event.target.value', event.target.value, event.target.value === '')
        if (event.target.value === "") {
            props.onChange && props.onChange(null);
            return;
        }

        const number = parseFloat(event.target.value);
        if (isNaN(number)) {
            return;
        }

        props.onChange && props.onChange(number);
    }

    /* TODO Thompson - fix onChange - it can have characters */
    // TODO Thompson - handle decimal place
    return (
        <FormControl sx={{ m: 1, width: props.width ?? '180px' }} variant="standard">
            <InputLabel htmlFor="total-field">{props.label}</InputLabel>
            <TextField
                type="number"
                id={props.id}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                disabled={props.readonly}
                margin="dense"
                size="small"
                value={props.value === null ? '' : props.value}
                variant={props.variant}
                onChange={onChange}
            />
        </FormControl>
    );
}

export default CurrencyField;
