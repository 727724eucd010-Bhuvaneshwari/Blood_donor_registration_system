package com.blooddonor.blooddonorsystem.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.blooddonor.blooddonorsystem.model.Feedback;
import com.blooddonor.blooddonorsystem.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class FeedbackController {
    private final FeedbackService feedbackService;
    public FeedbackController(FeedbackService feedbackService) { this.feedbackService = feedbackService; }

    @PostMapping
    public Feedback submitFeedback(@RequestBody Feedback feedback) { return feedbackService.submitFeedback(feedback); }

    // Public feedback browsing is intentionally disabled; admin reads feedback from /api/admin/feedback.
    @GetMapping("/center/{centerId}")
    public List<Feedback> getByCenter(@PathVariable Long centerId) { return feedbackService.getFeedbackByCenter(centerId); }
}
