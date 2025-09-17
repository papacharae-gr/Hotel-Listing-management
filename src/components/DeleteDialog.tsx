/* eslint-disable @typescript-eslint/no-explicit-any */
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


type DeleteDialogProps = {
  isDialogOpen: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
  deleteMutation: any;
  cancelRef: React.RefObject<HTMLButtonElement | null>;
  title: string;
  bodyText: string;
  cancelText?: string;
  confirmText?: string;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isDialogOpen,
  handleCancelDelete,
  handleConfirmDelete,
  deleteMutation,
  cancelRef,
  title,
  bodyText,
  cancelText ,
  confirmText ,
}) => {
  return (
  <Dialog open={isDialogOpen} onClose={handleCancelDelete} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
      <DialogContent id="delete-dialog-description">{bodyText}</DialogContent>
      <DialogActions>
  <Button ref={cancelRef} onClick={handleCancelDelete} color="primary">{cancelText}</Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={deleteMutation.isPending}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;