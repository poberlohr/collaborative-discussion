<template>
    <div id="app">
        <h1>Let's Have an Argument!</h1>
        <section v-for="claim in claims" class="claim">
            <section class="description">
                <h2>{{ claim.title }}</h2>
                <p>{{ claim.elaboration }}</p>
            </section>
            <section class="pros">
                <section v-for="pro in claim.pros" class="pro">
                    <h3>{{ pro.title }}</h3>
                    <p>{{ pro.elaboration }}</p>
                </section>
            </section>
            <section class="cons">
                <section v-for="con in claim.cons" class="con">
                    <h3>{{ con.title }}</h3>
                    <p>{{ con.elaboration }}</p>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return { claims: [] };
        },
        
        mounted() {
            let requestOptions = {
                method: 'GET',
                mode: 'cors',
            };

            let request = new Request('http://localhost:8000/claims', requestOptions);
            
            fetch(request).then((response) => {
                return response.json();
            }).then((data) => {
                this.claims = data.claims;
            }).catch((error) => {
                console.log('Error happened when fetching claims: ');
                console.log(error);
            });
        }
    }
</script>

<style lang="scss">
    body {
        background-color: #234;
    }
    
    #app {
        width: 800px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
    }
    
    h1 {
        text-align: center;
        color: #e8f0ff;
    }
    
    h2, h3, p { margin: 20px 0; }
    
    .claim {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "header header"
            "pros cons";
        
        color: #234;
        background-color: #def;
        border-radius: 20px;
        margin: 20px 0;
        padding: 0 20px;
        grid-column-gap: 10px;
    }
    
    .claim > .description { grid-area: header; }
    
    .claim > .pros { grid-area: pros; }
    
    .claim > .cons { grid-area: cons; }
</style>
