package id.go.depdagri.adminduk.api.dto;

import java.util.ArrayList;
import java.util.List;

public class MenuDTO {
    public final static String CLS_LEAF = "file";
    public final static String CLS_NOT_LEAF = "folder";

    private String id;
    private boolean visible;
    private String text;
    private boolean leaf;
    private boolean expanded = true;
    private String cls;
    private String screenType;
    private List<MenuDTO> children = new ArrayList<MenuDTO>();

    public MenuDTO(String text) {
        this.id = text;
        this.text = text;
    }

    public MenuDTO(String text, boolean visible) {
        this.id = text;
        this.text = text;
        this.visible = visible;
    }

    public MenuDTO(String text, String screenType) {
        this.id = text;
        this.text = text;
        this.screenType = screenType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isVisible() {
        if (this.children.size() == 0) {
            return visible;
        }

        for (MenuDTO child : this.children) {
            if (child.isVisible()) {
                return true;
            }
        }
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public String getScreenType() {
        return screenType;
    }

    public void setScreenType(String screenType) {
        this.screenType = screenType;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isLeaf() {
        return this.getChildren().size() <= 0;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public boolean isExpanded() {
        return expanded;
    }

    public void setExpanded(boolean expanded) {
        this.expanded = expanded;
    }

    public String getCls() {
        if (this.getChildren().size() > 0) {
            return CLS_NOT_LEAF;
        } else {
            return CLS_LEAF;
        }
    }

    public void setCls(String cls) {
        this.cls = cls;
    }

    public List<MenuDTO> getChildren() {
        if (this.isVisible()) {
            return children;
        } else {
            return new ArrayList<MenuDTO>();
        }
    }

    public void setChildren(List<MenuDTO> children) {
        this.children = children;
    }

    public void addChild(MenuDTO child) {
        this.children.add(child);
    }
}
