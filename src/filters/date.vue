<template>
    <span>{{ date }}</span>
</template>

<script>
import { formatDate } from '@/utils/date';

export default {
    name: 'MyDate',
    props: {
        data: {
            type: Number,
            required: true,
        },
    },
    computed: {
        date() {
            return formatDate(this.data);
        },
    },
};
</script>

