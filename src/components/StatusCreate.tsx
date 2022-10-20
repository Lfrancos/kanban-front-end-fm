import { Box } from "@mui/joy";
import { StatusCard } from "./StatusCard";
import { StatusForm } from './form/StatusForm';
import useStatusStore from './../store/statusStore';

export const StatusCreate =  () => {
    const toggleCreateStatus = useStatusStore(state => state.toggleCreateStatus);
    const onClose = () => {
        toggleCreateStatus()
    }
    return (
        <Box>
            <StatusCard>
                {/* <form */}
                <StatusForm onClose={onClose} />
            </StatusCard>


        </Box>
    );
}