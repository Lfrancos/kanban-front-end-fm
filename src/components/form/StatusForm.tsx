import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button } from "@mui/joy";
import { FormTextInput } from "./FormTextInput";

import CloseIcon from "@mui/icons-material/Close";
import { CreateButton } from "../buttons/CreateButton";


const ValidationSchema = Yup.object().shape({
    //title: Yup.string()
        //.min(2, "Too Short!")
        //.max(50, "Too Long!")
        //.required("Required"),
});

interface Props {
    onClose: () => void;
}

export const StatusForm = ({ onClose }: Props) => {


    const formik = useFormik({
        initialValues: { title: "" },
        validationSchema: ValidationSchema,
        onSubmit: (values: any) => {
            onClose();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    // marginTop: 2,
                    marginBottom: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                }}
            >
                <Button variant="plain" onClick={onClose}>
                    <CloseIcon />
                </Button>
            </Box>
            <FormTextInput
                autoFocus={true}
                name={"title"}
                placeholder={"Title..."}
                formik={formik}
            />
            <CreateButton fullWidth={true} >Add status</CreateButton>
        </form>
    );
};