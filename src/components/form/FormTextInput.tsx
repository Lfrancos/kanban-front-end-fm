import { TextField } from "@mui/joy";

interface Props {
    name: string;
    formik: any;
    placeholder: string;
    label?: string;
    type?: string;
    autoFocus?: boolean;
}

export const FormTextInput = ({
    autoFocus = false,
    label,
    name,
    placeholder,
    type = "text",
    formik,
}: Props) => {
    return (
        <TextField
            autoFocus={autoFocus}
            fullWidth
            id={name}
            name={name}
            label={label ? label : null}
            type={type}
            placeholder={placeholder}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    );
};
