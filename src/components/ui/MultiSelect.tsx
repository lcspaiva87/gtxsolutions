"use client";
import Icon from '@/components/ui/Icon';
import { Menu, Transition } from "@headlessui/react";
import React, { useState } from "react";
import createUserStore from '../partials/forms/register-user/store';
type InputProps = {
  name: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;


};

export const MultiSelect = ({ className, disabled }: InputProps) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [open, setOpen] = useState(false); // Estado para controlar a abertura do menu
  const {setCompany} = createUserStore()
  const options = [
    { id: 1, value: "option1", label: "Opção 1" },
    { id: 2, value: "option2", label: "Opção 2" },
    { id: 3, value: "option3", label: "Opção 3" },
    // Adicione mais opções conforme necessário
  ];

  const handleOptionClick = (value, label) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setCompany([...selectedOptions, value])
      setSelectedOptions([...selectedOptions, value]);
    }

  };

  const handleRemoveOption = (value) => {

    setSelectedOptions(selectedOptions.filter((option) => option !== value));

  };



  return (
    <div
      className="flex w-full items-center gap-2 rounded-md border border-secondary-300  ring-primary-200 transition-colors "
      onClick={() => setOpen(!open)}
    >

      <Menu as="div" className="relative w-full">
        <>
          <div className="relative px-2">
            {selectedOptions.map((option, index) => (
              <div
                key={option}
                className="bg-gray-400 rounded-md px-2  mr-1 inline-flex items-center"
              >
                <span className='text-gray-100 text-xs'>{option}</span>
                <button
                  type="button"
                  className="ml-1"
                  onClick={() => handleRemoveOption(option)}
                >
                    <Icon icon="heroicons-outline:x-mark" className=' w-3 text-gray-100' />
                </button>
              </div>
            ))}
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute z-10 mt-4 w-full bg-gray-900 border border-secondary-30 shadow-lg rounded-md overflow-auto "
            >
              {options.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? "bg-gray-400/30" : ""
                      } cursor-pointer select-none relative py-2 px-4`}
                      onClick={() =>
                        handleOptionClick(option.value, option.label)
                      }
                    >
                      <span className="font-normal">{option.label}</span>
                      {selectedOptions.includes(options.value) && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveOption(option.value);
                          }}
                          className="absolute top-0 right-0 p-1 focus:outline-none"
                        />

                      )}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      </Menu>
    </div>
  );
};
