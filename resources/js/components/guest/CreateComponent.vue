<template>
    <v-card raised class="mx-auto mt-5 pa-5" max-width="800px" height="100%">
        <v-card-title class="headline pa-0">Create Booking</v-card-title>
        <v-form ref="form" v-model="valid">
            <v-layout row justify-space-around>
                <v-flex>
                    <v-col cols="12" class="py-0">
                        <v-text-field 
                            v-model="first_name" 
                            v-validate="'required|max:20'"
                            :counter="20" 
                            :error-messages="errors.collect('first_name')"
                            data-vv-name="first_name"
                            label="First name" 
                            required 
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field 
                            v-model="last_name" 
                            v-validate="'required|max:20'"
                            :counter="20"
                            :error-messages="errors.collect('last_name')"
                            data-vv-name="last_name"
                            label="Last name" 
                            required 
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field 
                            v-model="email" 
                            v-validate="'required|email'"
                            :error-messages="errors.collect('email')"
                            data-vv-name="email"
                            label="E-mail" 
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field 
                            v-model="phone" 
                            v-validate="'required|integer'"
                            :error-messages="errors.collect('phone')"
                            data-vv-name="phone"
                            type="number" 
                            label="Phone" 
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-radio-group 
                            v-model="gender" 
                            v-validate="'required'"
                            :error-messages="errors.collect('gender')"
                            data-vv-name="gender"
                            row>
                            <v-radio label="Male" :value="0"></v-radio>
                            <v-radio label="Female" :value="1"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-textarea 
                            v-model="address" 
                            v-validate="'required'"
                            :error-messages="errors.collect('address')"
                            data-vv-name="address"
                            label="Address"
                            hint="Please enter your address"
                        ></v-textarea>
                    </v-col>

                    <v-col cols="12" class="text-center">
                        <v-btn class="ma-2" href="/">Return</v-btn>
                        <v-btn class="ma-2" color="info" @click="formSubmit">Submit</v-btn>
                    </v-col>
                </v-flex>
            </v-layout>
        </v-form>
    </v-card>
</template>

<script>
    import Lang from '../Helpers/Lang.js';

    export default {
        data: () => ({
            valid: false,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            gender: null,
            address: '',
            dictionary: {
                attributes: Lang.lang(),
            },
        }),
        mounted () {
            this.$validator.localize('en', this.dictionary);
        },
        methods: {
            formSubmit(e) {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        axios.post('/create', {
                            first_name: this.first_name,
                            last_name: this.last_name,
                            email: this.email,
                            phone: this.phone,
                            gender: this.gender,
                            address: this.address
                        })
                        .then((res) => {
                            toastr.success("Successfuly Submitted!");
                            this.$refs.form.reset();
                            this.$validator.reset()
                        })
                        .catch(err => console.log(err));
                    }
                });
                
                e.preventDefault();
            },
        },
    }
</script>
