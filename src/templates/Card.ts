import user_page_path from "@/computed/user_page_path";

export default (card?: any) => ({
    id: card && card.id ? card.id : "",
    name: {
        value: card && card.name ? card.name : "",
        changed: false,
    },
    link: card && card.id ? user_page_path(card.id) : "",
    email: {
        value: card && card.email ? card.email : "",
        changed: false,
    },
    vcf: {
        value: null,
        changed: false,
    },
    qrCode: null as null | Blob,
    mind: null,
    $state: {
        changed: false,
        updating: false,
    },
});