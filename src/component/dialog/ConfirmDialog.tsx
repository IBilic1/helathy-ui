import React from "react";

import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';

export type ConfirmDialogProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDialog = ({title, description, open, setOpen, onConfirm}: ConfirmDialogProps) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle id="confirm-dialog">{title}</DialogTitle>
                <DialogContent>{description}</DialogContent>
                <DialogActions>
                    <Button
                        variant="plain"
                        onClick={() => setOpen(false)}
                        color="neutral"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="plain"
                        onClick={() => {
                            setOpen(false);
                            onConfirm();
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
};

export default ConfirmDialog;