import {Box, Button, IconButton, List, ListItem, TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {formatToCurrency} from "../utilities/formatter";
import Description from "../types/Description";
import AddIcon from '@mui/icons-material/Add';
import TableRow from "../types/TableRow";
import CurrencyField from "../components/fields/CurrencyField";
import CustomerUtility from "../utilities/CustomerUtility";

interface EditableDescriptionListProps {
    descriptions: Description[];
    onSaveDescription: (description: Description) => void;
    onDeleteDescription: (description: Description) => void;
}

function EditableDescriptionList(props: EditableDescriptionListProps)
{
    const [description, setDescription] = useState<null | TableRow>(null);

    function onAddDescriptionRow() {
        setDescription({
            id: Date.now(),
            description: null,
            price: null,
            isDeleted: false,
        });
    }

    function onCurrencyChange(value: number | null) {
        setDescription({
            ...description,
            price: value
        });
    }

    function onDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setDescription({
            ...description,
            description: event.target.value
        });
    }

    async function onSaveDescription() {
        await props.onSaveDescription(description as Description);

        setDescription(null);
    }

    const saveButtonDisabled = !description?.description || !description?.price;

    async function onDeletedDescription(description: Description) {
        await props.onDeleteDescription(description);
    }

    return (
        <Box sx={{width: '500px', border: '1px solid #eee', borderRadius: '4px'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '0 10px'}}>
                <IconButton edge="end" aria-label="delete" onClick={onAddDescriptionRow}>
                    <AddIcon />
                </IconButton>
            </div>

            <List dense={true}>
                <DescriptionListHeader />

                {props.descriptions
                    .filter(CustomerUtility.filterDeletedDescription)
                    .map((description) => (
                    <ListItem key={description.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={() => onDeletedDescription(description)}/>
                            </IconButton>
                        }
                    >
                        <div style={{
                            display: 'flex',
                        }}>
                            <div style={{
                                width: '270px'
                            }}>
                                {description.description}
                            </div>
                            <div style={{flexGrow: 2, textAlign: 'right', width: '60px'}}>
                                {formatToCurrency(description.price)}
                            </div>
                        </div>
                    </ListItem>
                ))}

                {description && (
                    <ListItem>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '270px'
                            }}>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    size='small'
                                    value={description.description || ''}
                                    onChange={onDescriptionChange}
                                />
                            </div>
                            <div style={{width: '130px'}}>
                                <CurrencyField
                                    label=""
                                    id="descriptionPrice"
                                    value={description.price}
                                    variant='outlined'
                                    onChange={onCurrencyChange}
                                    width="100px"
                                />
                            </div>
                            <div>
                                <Button onClick={onSaveDescription} disabled={saveButtonDisabled}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </ListItem>
                )}
            </List>
        </Box>
    );
}

function DescriptionListHeader()
{
    return (
        <ListItem>
            <div style={{
                display: 'flex',
                fontWeight: 'bold',
            }}>
                <div style={{
                    width: '270px'
                }}>
                    Description
                </div>
                <div style={{width: '60px'}}>
                    Price
                </div>
            </div>
        </ListItem>
    )
}

export default EditableDescriptionList;
