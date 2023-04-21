import './form-input.styles.scss';
const FormInput = ({label, ...otherProps}) => {
    return (
        // the input component needs to be above label, otherwise, the label will not shrink when the user clicks input component (will still shrink when there is content inside input component)
        // (don't understand why, but just use it)

        <div className='group'>
            <input className='form-input' {...otherProps}/>  
            {label && ( // render the label only if it exists
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
        
    );
}

export default FormInput;