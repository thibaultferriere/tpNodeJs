package fr.cpe.rest.impl;

import ejb.MessageReceiverSyncLocal;
import ejb.MessageSenderLocal;
import fr.cpe.ConnectModel;
import fr.cpe.UserModel;
import fr.cpe.rest.WatchAuthRestService;

import javax.ejb.EJB;
import javax.enterprise.inject.Default;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.xml.ws.Response;

public class WatcherAuthImpl implements WatchAuthRestService {

    @EJB
    private MessageSenderLocal sender;

    @EJB
    private MessageReceiverSyncLocal receiver;
    private static final long serialVersionUID = 1L;

    @Override
    public ConnectModel postAuth(ConnectModel connectModel){


        System.out.println("---------------->>>>> TEEEEEST");

        String login = connectModel.login;
        String pwd = connectModel.pwd;

        UserModel userModel = new UserModel("toto", "toto", login, pwd, "admin");

        sender.sendMessage(userModel);
        UserModel response = receiver.receiveMessage();
        System.out.println("l'objet est" + userModel + " et :" + response);
        return connectModel;

        //    return "Hello (REST)";
    }
}
