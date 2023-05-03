import { FormInputLabel, Input, Group } from "./form-input.styles";
const FormInput = ({label, ...otherProps}) => {
    return (
        // the input component needs to be above label, otherwise, the label will not shrink when the user clicks input component (will still shrink when there is content inside input component)
        // (don't understand why, but just use it)

        <Group>
            <Input {...otherProps}/>  
            {label && ( // render the label only if it exists
                <FormInputLabel 
                  shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
        
    );
}

export default FormInput;