import React, {useState} from 'react';
import {Combobox, useCombobox} from '@mantine/core';
import {IconAdjustments} from "@tabler/icons-react";
import useJobs from "../../hooks/useJobs.tsx";
import useProfiles from "../../hooks/useProfiles.tsx";

interface SortProps {
    sortFor : string;
}

const Sort : React.FC<SortProps> =  ( { sortFor } ) => {

    const [jobSort, setJobSort] = useState("");
    const [profileSort, setProfileSort] = useState("");

    useJobs({ sort : jobSort });
    useProfiles({sort: profileSort});

    const opts = sortFor === "jobs" ? [
        'Relevance',
        'Most Recent',
        'Salary (Low to High)',
        'Salary (High to Low)'
    ] : [
        'Relevance',
        'Exp (Low to High)',
        'Exp (High to Low)'
    ];
    const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = opts.map((item) => (
        <Combobox.Option className="!text-xs" value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const handleRelevanceJobs = (relevance: string) => {
        let newSort: string;
        if (relevance === opts[1]) {
            newSort = "postTime,desc"
        } else if (relevance === opts[2]) {
            newSort = "packageOffered,asc"
        } else if (relevance === opts[3]) {
            newSort = "packageOffered,desc"
        } else {
            newSort = "";
        }
        setJobSort(newSort);
    }

    const handleRelevanceExperience = (relevance: string) => {
        let sort: string;
        if (relevance === opts[1]) {
            sort = "totalExperience,asc"
        } else if (relevance === opts[2]) {
            sort = "totalExperience,desc"
        } else {
            sort = "";
        }
        setProfileSort(sort);
    }

    return (
        <>
            <Combobox
                store={combobox}
                width={250}
                position="bottom-start"
                onOptionSubmit={(val) => {
                    if (sortFor === "jobs") {
                        handleRelevanceJobs(val)
                    } else {
                        handleRelevanceExperience(val);
                    }
                    setSelectedItem(val);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <div onClick={() => combobox.toggleDropdown()}
                         className={'flex items-center gap-2 px-2 py-1  text-sm xsm-mx:mt-2 xs-mx:text-xs xs-mx:px-1 xs-mx:py-0 rounded-xl border border-bright-sun-400 cursor-pointer'}>
                        {selectedItem}<IconAdjustments className="h-5 w-5 text-bright-sun-400"/>
                    </div>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}
export default Sort
