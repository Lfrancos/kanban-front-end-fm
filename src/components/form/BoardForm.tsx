import * as Yup from "yup";
import { Box, Button } from "@mui/joy";
import { FormTextInput } from "./formInput";

import CloseIcon from "@mui/icons-material/Close";

import { useFormik, FormikProps } from "formik";
import { usePostBoard } from "../../hooks/usePostBoard";

const ValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
});

interface Props {
    onClose: () => void;
}
interface FormProps {
    title: string;
}

export const BoardForm = ({ onClose }: Props) => {
    const addBoard = usePostBoard();

    const formik: FormikProps<FormProps> = useFormik({
        initialValues: { title: "" },
        validationSchema: ValidationSchema,
        onSubmit: (values: any) => {
            addBoard.mutate(values);
            onClose();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box
                sx={{
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
            <Box sx={{ px: "2rem" }}>
                <FormTextInput
                    autoFocus={true}
                    name={"title"}
                    placeholder={"Title..."}
                    formik={formik}
                />
                <Button sx={{ my: 2 }} fullWidth type={"submit"}>
                    Create Board
                </Button>
            </Box>
        </form>
    );
};
