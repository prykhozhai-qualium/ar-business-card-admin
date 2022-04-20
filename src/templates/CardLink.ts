export default (card_link: {
    id: string,
    username: string,
    email: string,
}) => ({
    id: card_link.id,
    name: card_link.username,
    email: card_link.email,
    link: "https://www.qualium-systems.com/",
    vcf: "#link",
    qrCode: "#link",
})