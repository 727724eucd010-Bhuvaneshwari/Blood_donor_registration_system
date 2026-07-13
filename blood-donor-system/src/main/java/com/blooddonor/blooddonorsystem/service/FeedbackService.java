package com.blooddonor.blooddonorsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonor.blooddonorsystem.model.Feedback;
import com.blooddonor.blooddonorsystem.repository.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
public List<Feedback> getFeedbackByCenter(Long centerId) {
    return feedbackRepository.findByBloodBank_CenterId(centerId);
}
}