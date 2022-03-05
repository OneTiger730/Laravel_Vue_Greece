<template>
  <div style="width: 100%">
    <v-layout class="user-profile">
      <v-layout column align-top justify-center>
        <user-profile-info
          :user-profile="userProfile"
          :loading="profileLoading"
          v-if="userProfile"
          class="mt-4"
        />
      </v-layout>
    </v-layout>
    <v-card ref="container" outlined :loading="loading" style="height: 400px">
      <v-card-title
        class="headline"
        style="justify-content: center; display: grid; margin-top: 100px"
      >
        <v-btn color="primary">
          <router-link :to="'/device'" style="color: white">Device</router-link>
        </v-btn>
        <v-btn color="primary" style="margin-top: 100px">
          <router-link :to="'/session-history'" style="color: white">
            History Session
          </router-link>
        </v-btn>
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UserProfileTable from "@/components/UserProfileTable.vue";
import UserModule from "@/store/modules/user";
import { UserProfile } from "@/store/models";
import { fields } from "@/forms/UserProfileFormValidator";
import UserProfileInfo from "@/components/UserProfileInfo.vue";
import UserProfileDetails from "@/components/UserProfileDetails.vue";
import userProfileService from "@/service/api/userProfileService";
import { EventBus } from "@/utils/event-bus";

@Component({
  components: { UserProfileDetails, UserProfileInfo, UserProfileTable }
})
export default class SelectionPageView extends Vue {
  private userProfile: UserProfile | null = null;

  private profileLoading = false;
  get canManageProfiles() {
    return UserModule.canManageProfiles;
  }

  get userId() {
    console.log(UserModule.user?.id);
    return UserModule.user?.id || null;
  }

  get fields() {
    return fields;
  }

  mounted() {
    if (this.userId) {
      this.fetchUserProfile(userProfileService.fetchByUserId(this.userId));
    }
  }

  private fetchUserProfile(promise: Promise<UserProfile>) {
    this.profileLoading = true;
    promise
      .then(profile => {
        this.userProfile = profile;
      })
      .catch(e => EventBus.$emit("error", e))
      .finally(() => {
        this.profileLoading = false;
      });
  }
}
</script>
