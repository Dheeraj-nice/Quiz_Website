package com.example.quiz_website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:3000") 
public class QuizController {

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @PostMapping("/submit")
    public List<String> submitQuiz(@RequestBody List<Question> submissions) {
        List<String> results = new ArrayList<>();

        for (Question submission : submissions) {
            // Find the corresponding question from the database based on the submission's questionId
            Question question = questionRepository.findById(submission.getId()).orElse(null);

            if (question != null) {
                String userAnswer = submission.getAnswer();
                if (userAnswer != null && userAnswer.equals(question.getCorrectAnswer())) {
                    results.add("Correct");
                } else {
                    results.add("Incorrect");
                }
            }
        }

        return results;
    }
}
