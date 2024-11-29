<script setup>

definePageMeta({
    title: 'New-realState',
    middleware: 'auth'
}) 
const { newRealState, success, loading, error, errors } = useRealStates()

async function createNewRealState(data){
    await newRealState(data)
    if(success.value)
        useRouter().push({path: '/real-states/done'})    
}
</script>
<template>
    <div>
        <RealStateForm :loading="loading" @submit="createNewRealState"/>
    </div>
</template>