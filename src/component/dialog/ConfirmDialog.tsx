import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";

export type ConfirmDialogProps = {
    title: string;
    description: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
}

const ConfirmDialog = ({title, description, open, setOpen, onConfirm}: ConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{description}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;