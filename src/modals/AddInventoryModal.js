import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Grid,
    Typography,
    Divider, // Import Grid
    IconButton, // Import IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon

const AddInventoryModal = ({ open, onClose, onSave, formData, setFormData, errors }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
             <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Add Inventory
                <IconButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider sx={{ mt: 0, mb: 0 }} />
            <DialogContent>
                <TextField
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 50 }}
                    helperText={`${formData.description.length}/50 Chars Max.`}
                    error={errors.description}
                    
                />
                <TextField
                    label="Address Line 1"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    fullWidth
                    margin="normal"
                    error={errors.addressLine1}
                    helperText={errors.addressLine1 ? "Address Line 1 is required" : ""}
                />
                <TextField
                    label="Address Line 2"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                {/* City, State, Zip in a single line using Grid */}
                <Grid container spacing={2} margin="normal">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            fullWidth
                            error={errors.city}
                            helperText={errors.city ? "City is required" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth error={errors.state}>
                            <InputLabel id="state-select-label">State</InputLabel>
                            <Select
                                labelId="state-select-label"
                                id="state-select"
                                value={formData.state}
                                label="State"
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="State">State</MenuItem>
                                <MenuItem value="CA">CA</MenuItem>
                                <MenuItem value="NY">NY</MenuItem>
                                {/* Add more states as needed */}
                            </Select>
                            <FormHelperText>{errors.state ? "State is required" : ""}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Zip"
                            value={formData.zip}
                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            fullWidth
                            error={errors.zip}
                            helperText={errors.zip ? "Zip is required" : ""}
                        />
                    </Grid>
                </Grid>
                {/* Add descriptive text */}
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
                    Notification Emails
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
                    These email addresses will receive a notification for any transaction in this
                    inventory. Separate multiple email addresses with a semicolon (;)
                </Typography>

                <TextField
                    label="Notification Emails"
                    value={formData.notificationEmails}
                    onChange={(e) => setFormData({ ...formData, notificationEmails: e.target.value })}
                    fullWidth
                    margin="normal"
                    error={errors.notificationEmails}
                    helperText={
                        errors.notificationEmails ? "Enter valid emails separated by semicolons" : ""
                    }
                />

                {/* Add divider */}
                <Divider sx={{ mt: 2, mb: 2 }} />

                 {/* Move buttons into DialogActions with custom styling */}
                 <DialogActions>
                    <Button onClick={onClose} color="success" variant="text">
                        Cancel
                    </Button>
                    <Button onClick={onSave} variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                        Save
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AddInventoryModal;