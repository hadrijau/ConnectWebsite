"use client";
import React, { useState } from "react";
import Autosuggest, { ChangeEvent } from "react-autosuggest";
import Image from "next/image";
import "@/styles/components/SearchBar.css";
import { competences } from "@/lib/competences";

interface SearchBarProps {
  onSelectOption: (option: { label: string; level: number }) => void;
  setSelectedCompetences: React.Dispatch<React.SetStateAction<{ label: string; level: number }[]>>;
  selectedCompetences: { label: string; level: number }[]
  placeholder: string;
  createMission: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({onSelectOption, setSelectedCompetences, selectedCompetences, placeholder, createMission}) => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Define your list of suggestions
  const suggestionsList = competences
  // Function to get suggestions based on user input
  const getSuggestions = (inputValue: string): string[] => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    const inputLength = inputValueLowerCase.length;

    return inputLength === 0
      ? []
      : suggestionsList.filter(
          (item) =>
            item.toLowerCase().slice(0, inputLength) === inputValueLowerCase &&
            !selectedCompetences.some(competence => competence.label.toLowerCase() === item.toLowerCase())
        );
  };

  // Function to render suggestion
  const renderSuggestion = (suggestion: string): React.ReactNode => (
    <div className="suggestion cursor-pointer rounded-xl px-5">{suggestion}</div>
  );

  const onSuggestionSelected = (_event: React.FormEvent, { suggestion }: { suggestion: string }): void => {
    if (!selectedCompetences.some(competence => competence.label.toLowerCase() === suggestion.toLowerCase())) {
      setSelectedCompetences([...selectedCompetences, { label: suggestion, level: 0 }]);
      onSelectOption({ label: suggestion, level: 0 });
      setValue('');
    }
  };

  const inputProps = {
    placeholder: placeholder,
    value,
    onChange: (
      _event: ChangeEvent,
      { newValue }: Autosuggest.ChangeEvent
    ): void => {
      setValue(newValue);
    },
    className: "w-full bg-inherit border-none outline-none",
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }): void => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = (): void => {
    setSuggestions([]);
  };


  const renderInputComponent = (inputProps: any): React.ReactNode => (
    <div className="flex search-container rounded-3xl py-3">
      <Image
        src="/search.svg"
        width={createMission ? 20: 30}
        height={createMission ? 20: 30}
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
      //@ts-ignore
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default SearchBar;
