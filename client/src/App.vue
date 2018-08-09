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
        data () {
            return {
                claims: [
                    {
                        title: 'Someone Should Create a Collaborative Open-Source Discussion Plattform',
                        elaboration: 'Someone should create an online plattform, where people can discuss topics. The participants should not just exchange pros and cons, but rather argue pros and cons in collaboration. The plattform\'s source code should be available to the public for free.',
                        pros: [
                            {
                                title: 'Open-Source Allows Instances for Specific Scopes of Application',
                                elaboration: 'If the plattform is open-source, everyone can create a personal plattform suited to ones interests. E.g. one interested in "A Song of Ice and Fire" could create an instance with the sole purpose to discuss conspiracy theories regarding the world of ASOIAF.'
                            },
                            {
                                title: 'Collaboration Improves Quality',
                                elaboration: 'The more participants, the more knowledge, the higher quality.'
                            }
                        ],
                        cons: [
                            {
                                title: 'Open Online Discussions don\'t Work due to Trolls',
                                elaboration: 'It is entirely impossible to have a high-quality discussion where everyone is allowed to participate. Trolls don\'t participate, they destroy.'
                            }
                        ]
                    },
                    {
                        title: 'A Collaborative Open-Source Discussion Plattform Should be Based on Claims',
                        elaboration: 'The central entities of a collaborative open-source discussion plattform should be claims. People should start new topics by claiming something and should add claims to argue for or argainst something.'
                    }
                ]
            }
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
