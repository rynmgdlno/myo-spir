export const getMessage = (type, name) => {
  switch (type) {
    case "contact":
      return `Thanks ${name} for your interest! I'll be getting back to you shortly.`;
    case "referral":
      return `Thanks ${name} for the referral! I'll be getting back to you shortly.`;
  }
};

