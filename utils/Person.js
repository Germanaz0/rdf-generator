class Person {
    constructor(item) {
    
        this["@context"] = "http://schema.org";
        this["@type"] = "Person";
        this["address"] = {
            "@type": "PostalAddress",
            "addressLocality": item.addressLocality,
            "addressRegion": item.addressRegion,
            "streetAddress": item.streetAddress,
            "postalCode": item.postalCode,
        },
        this.name = item.name;
        this.email = item.email;
        this.gender = item.gender;
        this.nationality = item.nationality;
        this.telephone = item.telephone;
        this.birthDate = item.birthDate;
        this.birthPlace = item.birthPlace;
        this.jobTitle = item.jobTitle;
        this.height = item.height;
    }
}

module.exports = Person;