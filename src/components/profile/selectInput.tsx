import {useEffect, useState} from 'react';
import {Combobox, InputBase, ScrollArea, useCombobox} from '@mantine/core';

const SelectInput = (props: any) => {
    useEffect(() => {
        if (props.name !== "name") setData(props.options);
        setValue(props.form.getInputProps(props.name).value);
        setSearch(props.form.getInputProps(props.name).value);
    }, [props.form, props.name, props.options]);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    let options;
    let exactOptionMatch;
    if (props.name !== "name"){
         exactOptionMatch = data?.some((item) => item === search);
        const filteredOptions = exactOptionMatch
            ? data
            : data?.filter((item) => item.toLowerCase().includes(search?.toLowerCase().trim()));

        options = filteredOptions?.map((item) => (
            <Combobox.Option value={item} key={item}>
                {item}
            </Combobox.Option>
        ));
    }


    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                console.log("onOptionSubmit triggered with value:", val);
                if (val === '$create') {
                    const trimmed = search.trim();
                    setData((current) => [...current, trimmed]);
                    setValue(trimmed);
                    console.log("in create",search);
                    props.form.setFieldValue(props.name, trimmed);
                } else {
                    setValue(val);
                    setSearch(val);
                    props.form.setFieldValue(props.name, val)
                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    {...props.form.getInputProps(props.name)}
                    withAsterisk
                    label={props.label}
                    leftSection={<props.leftSection stroke={1.5} />}
                    rightSection={<Combobox.Chevron/>}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type={"scroll"}>
                        {options}
                        {!exactOptionMatch && search?.trim().length > 0 && (
                            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
export default SelectInput
