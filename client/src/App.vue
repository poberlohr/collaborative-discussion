<template>
    <div id="app">
        <h1>Let's Have an Argument!</h1>

        <form v-if="isAddClaimFormShown" v-on:submit.prevent="saveNewClaim">
            <label>
                <span>Title:</span>
                <input v-model="newClaim.title" type="text" />
            </label>
            <label>
                <span>Elaborate:</span>
                <textarea v-model="newClaim.elaboration" />
            </label>
            <button>Save</button>
        </form>
        <button v-else v-on:click="showAddClaimForm">Claim something new</button>

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
            return {
                claims: [],
                isAddClaimFormShown: false,
                newClaim: this.createEmptyNewClaim()
            };
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
        },

        methods: {
            createEmptyNewClaim() {
                return {
                    title: '',
                    elaboration: ''
                };
            },

            showAddClaimForm() {
                this.isAddClaimFormShown = true;
            },

            saveNewClaim() {
                fetch('http://localhost:8000/claims', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newClaim),
                    mode: 'cors'
                }).then((response) => {
                    console.log('post response:');
                    console.log(response);

                    if (response.status === 200 || response.status === 201) {
                        this.claims.unshift(this.newClaim);
                        this.newClaim = this.createEmptyNewClaim();
                        this.isAddClaimFormShown = false;
                    } else {
                        const error = new Error(
                            'Claim not saved: '
                            + response.statusText
                            + ' (' + response.status + ')');
                        return Promise.reject(error);
                    }
                }).catch((error) => {
                    alert(error);
                    console.log('post error:');
                    console.log(error);
                });
            }
        }
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

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

    form, .claim {
        color: #234;
        background-color: #def;
        border-radius: 20px;
        margin: 20px 0;
    }

    form {
        padding: 20px;
    }

    form > * {
        margin: 20px 0;
        display: block;
    }

    form > *:first-child { margin-top: 0; }

    form > *:last-child { margin-bottom: 0; }

    form label, form label > * {
        display: block;
        width: 100%;
    }

    .claim {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "header header"
            "pros cons";

        padding: 0 20px;
        grid-column-gap: 10px;
    }

    .claim > .description { grid-area: header; }

    .claim > .pros { grid-area: pros; }

    .claim > .cons { grid-area: cons; }

    .pro {
        padding-left: 20px;
        background: linear-gradient(to right, lightgreen, lightgreen 3px, rgba(0, 0, 0, 0) 10px);
    }

    .con {
        padding-left: 20px;
        background: linear-gradient(to right, lightcoral, lightcoral 3px, rgba(0, 0, 0, 0) 10px);
    }


</style>
