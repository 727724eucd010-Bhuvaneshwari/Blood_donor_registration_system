package com.blooddonor.blooddonorsystem.util;

import java.util.ArrayList;
import java.util.List;

public class BloodCompatibility {

    public static List<String> getCompatibleDonorGroups(String recipientBloodGroup) {

        List<String> compatibleGroups = new ArrayList<>();

        if (recipientBloodGroup.equals("O-")) {
            compatibleGroups.add("O-");
        }
        else if (recipientBloodGroup.equals("O+")) {
            compatibleGroups.add("O+");
            compatibleGroups.add("O-");
        }
        else if (recipientBloodGroup.equals("A-")) {
            compatibleGroups.add("A-");
            compatibleGroups.add("O-");
        }
        else if (recipientBloodGroup.equals("A+")) {
            compatibleGroups.add("A+");
            compatibleGroups.add("A-");
            compatibleGroups.add("O+");
            compatibleGroups.add("O-");
        }
        else if (recipientBloodGroup.equals("B-")) {
            compatibleGroups.add("B-");
            compatibleGroups.add("O-");
        }
        else if (recipientBloodGroup.equals("B+")) {
            compatibleGroups.add("B+");
            compatibleGroups.add("B-");
            compatibleGroups.add("O+");
            compatibleGroups.add("O-");
        }
        else if (recipientBloodGroup.equals("AB-")) {
            compatibleGroups.add("AB-");
            compatibleGroups.add("A-");
            compatibleGroups.add("B-");
            compatibleGroups.add("O-");
        }
        else if (recipientBloodGroup.equals("AB+")) {
            compatibleGroups.add("AB+");
            compatibleGroups.add("AB-");
            compatibleGroups.add("A+");
            compatibleGroups.add("A-");
            compatibleGroups.add("B+");
            compatibleGroups.add("B-");
            compatibleGroups.add("O+");
            compatibleGroups.add("O-");
        }

        return compatibleGroups;
    }
}