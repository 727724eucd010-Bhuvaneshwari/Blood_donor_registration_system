package com.blooddonor.blooddonorsystem.util;

import java.util.Arrays;
import java.util.List;

public final class BloodCompatibility {
    private BloodCompatibility() { }

    public static List<String> getCompatibleDonorGroups(String recipientBloodGroup) {
        if (recipientBloodGroup == null) return List.of();
        return switch (recipientBloodGroup.trim().toUpperCase()) {
            case "O-" -> List.of("O-");
            case "O+" -> List.of("O+", "O-");
            case "A-" -> List.of("A-", "O-");
            case "A+" -> List.of("A+", "A-", "O+", "O-");
            case "B-" -> List.of("B-", "O-");
            case "B+" -> List.of("B+", "B-", "O+", "O-");
            case "AB-" -> List.of("AB-", "A-", "B-", "O-");
            case "AB+" -> Arrays.asList("AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-");
            default -> List.of();
        };
    }
}
