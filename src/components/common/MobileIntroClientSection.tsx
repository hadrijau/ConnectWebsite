import React from "react";

interface MobileIntroClientSectionProps {
  firstTitle: string;
  secondTitle: string;
}

const MobileIntroClientSection: React.FC<MobileIntroClientSectionProps> = ({
  firstTitle,
  secondTitle,
}) => {
  return (
    <div className="display-mobile">
      <h1 className="header-title-text font-semibold mt-8">{firstTitle}</h1>
      <h5 className="undertitle-text my-4">`&quot;`{secondTitle}`&quot;`</h5>
    </div>
  );
};

export default MobileIntroClientSection;
