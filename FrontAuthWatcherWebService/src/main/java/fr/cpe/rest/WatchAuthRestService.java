package fr.cpe.rest;

import fr.cpe.ConnectModel;

import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Path("/WatcherAuth")
public interface WatchAuthRestService {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.APPLICATION_JSON)
    ConnectModel postAuth(ConnectModel connectModel);
}