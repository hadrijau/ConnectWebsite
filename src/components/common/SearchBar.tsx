"use client";
import React, { useState } from "react";
import Autosuggest, { ChangeEvent } from "react-autosuggest";
import Image from "next/image";
import "@/styles/components/SearchBar.css";

interface SearchBarProps {
  onSelectOption: (option: string) => void;
  setSelectedCompetences: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCompetences: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({onSelectOption, setSelectedCompetences, selectedCompetences}) => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Define your list of suggestions
  const suggestionsList: string[] = [
    "Ecriture",
    "UX Design",
    "Communication",
    "Pack Office",
  ];

  // Function to get suggestions based on user input
  const getSuggestions = (inputValue: string): string[] => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    const inputLength = inputValueLowerCase.length;

    return inputLength === 0
      ? []
      : suggestionsList.filter(
          (item) =>
            item.toLowerCase().slice(0, inputLength) === inputValueLowerCase
        );
  };

  // Function to render suggestion
  const renderSuggestion = (suggestion: string): React.ReactNode => (
    <div className="suggestion w-9/12 cursor-pointer rounded-xl px-5">{suggestion}</div>
  );

  const onSuggestionSelected = (_event: React.FormEvent, { suggestion }: { suggestion: string }): void => {
    setSelectedCompetences([...selectedCompetences, suggestion]);
    onSelectOption(suggestion);
    setValue(''); 
  };

  // Autosuggest input properties
  const inputProps = {
    placeholder: "Ecriture, UX Design, Communication, Pack Office ...",
    value,
    onChange: (
      _event: ChangeEvent,
      { newValue }: Autosuggest.ChangeEvent
    ): void => {
      setValue(newValue);
    },
    className: "w-full bg-inherit border-none outline-none",
  };

  // Autosuggest callbacks
  const onSuggestionsFetchRequested = ({ value }: { value: string }): void => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = (): void => {
    setSuggestions([]);
  };



  const renderInputComponent = (inputProps: any): React.ReactNode => (
    <div className="flex search-container rounded-3xl py-3 w-9/12">
      <Image
        src="/search.svg"
        width={30}
        height={30}
        alt="Recherche"
        className="mx-3"
      />
      <input {...inputProps} />
    </div>
  );

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion: string): string => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default SearchBar;
