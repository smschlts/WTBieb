package nl.workingtalent.bieb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
public class BoekService {
     @Autowired
     BoekInterface boekInterface;


}
