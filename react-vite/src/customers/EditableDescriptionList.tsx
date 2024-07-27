import {Box, Button, IconButton, List, ListItem, TextField} from '@mui/material';
import {ChangeEvent, useState} from 'react';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {formatToCurrency} from "../utilities/formatter";
import AddIcon from '@mui/icons-material/Add';
import TableRow from "../types/TableRow";
import CurrencyField from "../components/fields/CurrencyField";
import {useCustomerRoutes, useCustomerUpdateRoutes} from "../hooks/customer.tsx";
import Route from "../types/Route.ts";

interface EditableDescriptionListProps {
    customerId: number;
}

function EditableDescriptionList(props: EditableDescriptionListProps)
{
    const [route, setRoute] = useState<null | TableRow>(null);
    const customerRoutes = useCustomerRoutes(props.customerId);
    const customerUpdateRoutes = useCustomerUpdateRoutes(props.customerId);

    function onAddDescriptionRow() {
        setRoute({
            customer_id: props.customerId,
            description: null,
            price: null,
        });
    }

    function onCurrencyChange(value: number | null) {
        setRoute({
            ...route,
            price: value
        });
    }

    function onDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setRoute({
            ...route,
            description: event.target.value
        });
    }

    async function onSaveDescription() {
        customerUpdateRoutes.create(props.customerId, route as Route);

        setRoute(null);
    }

    function onDeletedDescription(route: Route) {
        customerUpdateRoutes.delete(route.id);
    }

    const saveButtonDisabled = !route?.description || !route?.price;

    return (
        <Box sx={{width: '500px', border: '1px solid #eee', borderRadius: '4px'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '0 10px'}}>
                <IconButton edge="end" aria-label="delete" onClick={onAddDescriptionRow}>
                    <AddIcon />
                </IconButton>
            </div>

            <List dense={true}>
                <DescriptionListHeader />

                {customerRoutes.data
                    ?.map((route) => (
                    <ListItem key={route.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={() => onDeletedDescription(route)}/>
                            </IconButton>
                        }
                    >
                        <div style={{
                            display: 'flex',
                        }}>
                            <div style={{
                                width: '270px'
                            }}>
                                {route.description}
                            </div>
                            <div style={{flexGrow: 2, textAlign: 'right', width: '60px'}}>
                                {formatToCurrency(route.price)}
                            </div>
                        </div>
                    </ListItem>
                ))}

                {route && (
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
                                    value={route.description || ''}
                                    onChange={onDescriptionChange}
                                />
                            </div>
                            <div style={{width: '130px'}}>
                                <CurrencyField
                                    label=""
                                    id="descriptionPrice"
                                    value={route.price}
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
