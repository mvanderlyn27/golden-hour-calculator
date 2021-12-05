import { Stack, TextField, PrimaryButton, IStackStyles, IStackTokens, DatePicker, DayOfWeek,defaultDatePickerStrings} from "@fluentui/react";

const Input = () => {

const inputItem: IStackStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
const inputParent: IStackTokens = {childrenGap: 5};
    return(
        <div>
            <Stack tokens={inputParent}>
                <Stack.Item styles = {inputItem}>
                    <TextField label="Latitude"/>
                </Stack.Item>
                <Stack.Item styles = {inputItem}>
                    <TextField label="Longitude"/>
                </Stack.Item>
                <Stack.Item styles = {inputItem}>
                    <DatePicker
                        firstDayOfWeek={DayOfWeek.Monday}
                        placeholder="Select a date..."
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                </Stack.Item>
                <Stack.Item styles = {inputItem}>
                    <PrimaryButton text="Submit"/>
                </Stack.Item>
            </Stack>
        </div>


    );
}

export default Input; 