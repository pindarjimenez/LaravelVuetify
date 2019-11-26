<template>
    <v-container>
        <v-card raised class="mx-auto pa-5" max-width="1500px" height="100%">
            <v-row>
                <v-col cols="12" class="px-6">
                    <v-btn outlined color="blue" class="float-right" href="/create">Create Booking</v-btn>
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="bookings" :items-per-page="10" class="elevation-1">
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.first_name }}</td>
                        <td>{{ props.item.last_name }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.phone }}</td>
                        <td>{{ props.item.gender == 0 ? 'Male' : 'Female' }}</td>
                        <td>{{ props.item.address }}</td>
                        <td width="200px">
                            <v-btn small outlined color="green darken-1" @click="updateBooking(props.item)">Update</v-btn>
                            <v-btn small outlined color="red darken-1" @click="deleteBooking(props.item.id)">Delete</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            
        </v-card>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-form ref="form" v-model="valid">
                        <v-card-title class="headline">Guest: {{ `${first_name} ${last_name}` }}</v-card-title>
                        <v-card-text>
                            <v-row>
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
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" @click="dialog = false">Close</v-btn>
                            <v-btn color="green darken-1" @click="submitBooking()">Update</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import Lang from '../Helpers/Lang.js';

    export default {
        data() {
            return {
                valid: false,
                bookings: [],
                id: null,
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                gender: null,
                address: '',
                dialog: false,
                dictionary: {
                    attributes: Lang.lang(),
                },
                headers: [
                    { text: '#', value: 'id' },
                    { text: 'First Name', value: 'first_name' },
                    { text: 'Last Name', value: 'last_name' },
                    { text: 'Email Address', value: 'email' },
                    { text: 'Phone Number', value: 'phone' },
                    { text: 'Gender', value: 'gender' },
                    { text: 'Address', value: 'address' },
                    { text: 'Action'},
                ],
            }
        },
        methods: {
            fetchBooking() {
                axios.get(`/get-bookings`).then((res) => {
                    if (typeof res.data != 'undefined') {
                        this.bookings = res.data;
                    } else {
                        this.bookings = [];
                    }
                }).catch(err => console.log(err));
            },
            deleteBooking(id) {
                axios.delete(`/booking/`+id).then(response => {
                    toastr.success('Successfully Deleted!');
                    this.fetchBooking();
                }).catch(err => console.log(err));
            },
            updateBooking(booking) {
                this.id = booking.id;
                this.first_name = booking.first_name;
                this.last_name = booking.last_name;
                this.email = booking.email; 
                this.phone = booking.phone;
                this.gender = booking.gender;
                this.address = booking.address;
                this.dialog = true;
            },
            submitBooking() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        axios.post('/update', {
                            id: this.id,
                            first_name: this.first_name,
                            last_name: this.last_name,
                            email: this.email,
                            phone: this.phone,
                            gender: this.gender,
                            address: this.address
                        })
                        .then((res) => {
                            $('#update').modal('hide');
                            toastr.success('Successfully Updated!');
                            this.fetchBooking();
                            this.dialog = false;
                        })
                        .catch(err => console.log(err));
                    }
                });
            }
        },
        mounted() {
            this.fetchBooking();
            console.log(this.dictionary);
            this.$validator.localize('en', this.dictionary);
        },
        computed: {
            isComplete () {
                return this.first_name && this.last_name && this.email && this.phone && this.address;
            }
        }
    }
</script>
